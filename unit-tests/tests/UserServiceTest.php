<?php
require_once __DIR__ . '/../src/UserService.php';

use PHPUnit\Framework\TestCase;
use app\services\UserService;

class UserServiceTest extends TestCase
{
    public function testRegistrationWithoutNameIsRejected(): void
    {
        $service = (new ReflectionClass(UserService::class))
            ->newInstanceWithoutConstructor();

        $result = $service->register([
            'email' => 'test@example.com',
            'password' => 'Password123'
        ]);

        $this->assertFalse($result['success']);
        $this->assertSame(
            'Name, email, and password are required',
            $result['message']
        );
    }

    /**
     * @dataProvider missingRequiredFields
     */
    public function testRegistrationWithMissingRequiredFieldIsRejected(array $data): void
    {
        $service = (new ReflectionClass(UserService::class))
            ->newInstanceWithoutConstructor();

        $result = $service->register($data);

        $this->assertFalse($result['success']);
        $this->assertSame(
            'Name, email, and password are required',
            $result['message']
        );
    }

    public function missingRequiredFields(): array
    {
        return [
            'UT-02 missing email' => [
                ['name' => 'Ali', 'password' => 'Password123']
            ],
            'UT-03 missing password' => [
                ['name' => 'Ali', 'email' => 'test@example.com']
            ]
        ];
    }

    public function testRegistrationWithInvalidEmailIsRejected(): void
    {
        $service = (new ReflectionClass(UserService::class))
            ->newInstanceWithoutConstructor();

        $result = $service->register([
            'name' => 'Ali',
            'email' => 'ali-neispravan-email',
            'password' => 'Password123'
        ]);

        $this->assertFalse($result['success']);
        $this->assertSame('Invalid email format', $result['message']);
    }

    public function testSuccessfulRegistrationHashesPassword(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['create'])
            ->getMock();

        $dao->expects($this->once())
            ->method('create')
            ->with($this->callback(function ($data) {
                return $data['name'] === 'Ali'
                    && $data['email'] === 'ali@example.com'
                    && password_verify('Password123', $data['password']);
            }))
            ->willReturn(42);

        $service = new UserService($dao, new \stdClass());

        $result = $service->register([
            'name' => 'Ali',
            'email' => 'ali@example.com',
            'password' => 'Password123'
        ]);

        $this->assertTrue($result['success']);
        $this->assertSame(42, $result['user_id']);
    }

    public function testLoginWithNonexistentUserIsRejected(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['getByEmail'])
            ->getMock();

        $dao->expects($this->once())
            ->method('getByEmail')
            ->with('unknown@example.com')
            ->willReturn(null);

        $service = new UserService($dao, new \stdClass());

        $result = $service->login('unknown@example.com', 'Password123');

        $this->assertFalse($result['success']);
        $this->assertSame('User not found', $result['message']);
    }

    public function testLoginWithWrongPasswordIsRejected(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['getByEmail'])
            ->getMock();

        $dao->expects($this->once())
            ->method('getByEmail')
            ->with('ali@example.com')
            ->willReturn([
                'id' => 42,
                'name' => 'Ali',
                'email' => 'ali@example.com',
                'password' => password_hash('Correct123', PASSWORD_BCRYPT)
            ]);

        $service = new UserService($dao, new \stdClass());

        $result = $service->login('ali@example.com', 'Wrong123');

        $this->assertFalse($result['success']);
        $this->assertSame('Invalid password', $result['message']);
    }

    public function testSuccessfulLoginReturnsTokenAndUser(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['getByEmail'])
            ->getMock();

        $dao->expects($this->once())
            ->method('getByEmail')
            ->with('ali@example.com')
            ->willReturn([
                'id' => 42,
                'name' => 'Ali',
                'email' => 'ali@example.com',
                'password' => password_hash('Correct123', PASSWORD_BCRYPT)
            ]);

        $auth = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['generateToken'])
            ->getMock();

        $auth->expects($this->once())
            ->method('generateToken')
            ->with(42)
            ->willReturn('mock-jwt-token');

        $service = new UserService($dao, $auth);

        $result = $service->login('ali@example.com', 'Correct123');

        $this->assertTrue($result['success']);
        $this->assertSame('Login successful', $result['message']);
        $this->assertSame('mock-jwt-token', $result['token']);
        $this->assertSame(42, $result['user']['id']);
        $this->assertArrayNotHasKey('password', $result['user']);
    }

    public function testGetUserByIdDoesNotExposePassword(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['read'])
            ->getMock();

        $dao->expects($this->once())
            ->method('read')
            ->with(42)
            ->willReturn([
                'id' => 42,
                'name' => 'Ali',
                'email' => 'ali@example.com',
                'password' => 'hashed-password'
            ]);

        $service = new UserService($dao, new \stdClass());

        $result = $service->getUserById(42);

        $this->assertTrue($result['success']);
        $this->assertSame(42, $result['user']['id']);
        $this->assertArrayNotHasKey('password', $result['user']);
    }

    public function testUpdateUserHashesNewPassword(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['read', 'update'])
            ->getMock();

        $dao->expects($this->once())
            ->method('read')
            ->with(42)
            ->willReturn(['id' => 42, 'name' => 'Ali']);

        $dao->expects($this->once())
            ->method('update')
            ->with(
                42,
                $this->callback(function ($data) {
                    return isset($data['password'])
                        && $data['password'] !== 'NewPassword123'
                        && password_verify(
                            'NewPassword123',
                            $data['password']
                        );
                })
            )
            ->willReturn(true);

        $service = new UserService($dao, new \stdClass());

        $result = $service->updateUser(42, [
            'password' => 'NewPassword123'
        ]);

        $this->assertTrue($result['success']);
        $this->assertSame(
            'User updated successfully',
            $result['message']
        );
    }

    public function testGetAllUsersDoesNotExposePasswords(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['readAll'])
            ->getMock();

        $dao->expects($this->once())
            ->method('readAll')
            ->willReturn([
                ['id' => 1, 'name' => 'Ali', 'password' => 'hash1'],
                ['id' => 2, 'name' => 'Sara', 'password' => 'hash2']
            ]);

        $service = new UserService($dao, new \stdClass());

        $result = $service->getAllUsers();

        $this->assertTrue($result['success']);
        $this->assertCount(2, $result['users']);

        foreach ($result['users'] as $user) {
            $this->assertArrayNotHasKey('password', $user);
        }
    }

    public function testDeleteUserSuccessfully(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['delete'])
            ->getMock();

        $dao->expects($this->once())
            ->method('delete')
            ->with(42)
            ->willReturn(true);

        $service = new UserService($dao, new \stdClass());

        $result = $service->deleteUser(42);

        $this->assertTrue($result['success']);
        $this->assertSame(
            'User deleted successfully',
            $result['message']
        );
    }

    public function testDeleteUserFailure(): void
    {
        $dao = $this->getMockBuilder(\stdClass::class)
            ->addMethods(['delete'])
            ->getMock();

        $dao->expects($this->once())
            ->method('delete')
            ->with(42)
            ->willReturn(false);

        $service = new UserService($dao, new \stdClass());

        $result = $service->deleteUser(42);

        $this->assertFalse($result['success']);
        $this->assertSame('Delete failed', $result['message']);
    }
}
