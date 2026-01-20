<?php

namespace App\Services;

use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\Models\Activity;

/**
 * Class UserService
 * Generate by Antigravity
 */
class UserService
{
    protected $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllUsers($limit = 10)
    {
        return $this->repository->getAllPaginated($limit);
    }

    public function getUserById($id)
    {
        return $this->repository->findById($id);
    }

    public function createUser(array $data)
    {
        return DB::transaction(function () use ($data) {
            $data['password'] = Hash::make($data['password']);
            $user = $this->repository->create($data);

            if (isset($data['roles'])) {
                $user->syncRoles($data['roles']);
            }

            activity()
                ->performedOn($user)
                ->causedBy(auth()->user())
                ->log("Created user: {$user->name}");

            return $user;
        });
    }

    public function updateUser($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            if (isset($data['password']) && !empty($data['password'])) {
                $data['password'] = Hash::make($data['password']);
            } else {
                unset($data['password']);
            }

            $user = $this->repository->update($id, $data);

            if (isset($data['roles'])) {
                $user->syncRoles($data['roles']);
            }

            activity()
                ->performedOn($user)
                ->causedBy(auth()->user())
                ->log("Updated user: {$user->name}");

            return $user;
        });
    }

    public function deleteUser($id)
    {
        return DB::transaction(function () use ($id) {
            $user = $this->repository->findById($id);
            $userName = $user->name;

            $this->repository->delete($id);

            activity()
                ->causedBy(auth()->user())
                ->log("Deleted user: {$userName}");

            return true;
        });
    }

    public function getAvailableRoles()
    {
        return $this->repository->getAllRoles();
    }
}
