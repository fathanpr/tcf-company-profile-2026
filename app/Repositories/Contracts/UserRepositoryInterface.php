<?php

namespace App\Repositories\Contracts;

/**
 * Interface UserRepositoryInterface
 * Generate by Antigravity
 */
interface UserRepositoryInterface
{
    public function getAllPaginated($limit = 10);
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function getAllRoles();
}
