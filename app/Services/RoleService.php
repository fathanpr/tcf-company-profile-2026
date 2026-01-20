<?php

namespace App\Services;

use App\Repositories\Contracts\RoleRepositoryInterface;
use Illuminate\Support\Facades\DB;

/**
 * Class RoleService
 * Generate by Antigravity
 */
class RoleService
{
    protected $repository;

    public function __construct(RoleRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllRoles()
    {
        return $this->repository->getAll();
    }

    public function getRoleById($id)
    {
        return $this->repository->findById($id);
    }

    public function createRole(array $data)
    {
        return DB::transaction(function () use ($data) {
            $role = $this->repository->create($data);

            if (isset($data['permissions'])) {
                $role->syncPermissions($data['permissions']);
            }

            activity()
                ->performedOn($role)
                ->causedBy(auth()->user())
                ->log("Created role: {$role->name}");

            return $role;
        });
    }

    public function updateRole($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $role = $this->repository->update($id, $data);

            if (isset($data['permissions'])) {
                $role->syncPermissions($data['permissions']);
            }

            activity()
                ->performedOn($role)
                ->causedBy(auth()->user())
                ->log("Updated role: {$role->name}");

            return $role;
        });
    }

    public function deleteRole($id)
    {
        return DB::transaction(function () use ($id) {
            $role = $this->repository->findById($id);
            $roleName = $role->name;

            $this->repository->delete($id);

            activity()
                ->causedBy(auth()->user())
                ->log("Deleted role: {$roleName}");

            return true;
        });
    }

    public function getAvailablePermissions()
    {
        return $this->repository->getAllPermissions();
    }
}
