<?php

namespace App\Repositories\Contracts;

interface AdRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedActive($limit = 10);
}
