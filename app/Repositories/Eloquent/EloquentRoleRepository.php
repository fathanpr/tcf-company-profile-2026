<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

/**
 * Class EloquentRoleRepository
 * Generate by Antigravity
 */
class EloquentRoleRepository implements RoleRepositoryInterface
{
    protected $model;

    public function __construct(Role $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->with('permissions')->get();
    }

    public function getAllPermissions()
    {
        return Permission::all();
    }

    public function findById($id)
    {
        return $this->model->with('permissions')->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create(['name' => $data['name']]);
    }

    public function update($id, array $data)
    {
        $role = $this->findById($id);
        $role->update(['name' => $data['name']]);
        return $role;
    }

    public function delete($id)
    {
        $role = $this->findById($id);
        return $role->delete();
    }
}
