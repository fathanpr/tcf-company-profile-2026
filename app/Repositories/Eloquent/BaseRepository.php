<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all records.
     * Generate by Antigravity
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Find a record by ID.
     * Generate by Antigravity
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create a new record.
     * Generate by Antigravity
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Update an existing record.
     * Generate by Antigravity
     */
    public function update($id, array $data)
    {
        $record = $this->model->find($id);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return null;
    }

    /**
     * Delete a record.
     * Generate by Antigravity
     */
    public function delete($id)
    {
        $record = $this->model->find($id);
        if ($record) {
            return $record->delete();
        }
        return false;
    }
}
