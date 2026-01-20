<?php

namespace App\Repositories\Contracts;

/**
 * Interface RoleRepositoryInterface
 * Generate by Antigravity
 */
interface RoleRepositoryInterface
{
    public function getAll();
    public function getAllPermissions();
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
