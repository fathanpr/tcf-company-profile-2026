<?php

namespace App\Services;

use App\Repositories\Contracts\AdRepositoryInterface;
use Illuminate\Support\Facades\DB;

class AdService extends BaseService
{
    protected $repository;

    public function __construct(AdRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getActiveAds($limit = 10)
    {
        return $this->repository->getPaginatedActive($limit);
    }

    public function getAllAds($perPage = 10, $search = null)
    {
        return $this->repository->paginate($perPage, $search);
    }

    public function getAdById($id)
    {
        return $this->repository->find($id);
    }

    public function createAd(array $data)
    {
        return DB::transaction(function () use ($data) {
            $data = $this->handleImageInput($data);
            $ad = $this->repository->create($data);

            activity()
                ->performedOn($ad)
                ->causedBy(auth()->user())
                ->log("Created ad: {$ad->title}");

            return $ad;
        });
    }

    public function updateAd($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $data = $this->handleImageInput($data);
            $ad = $this->repository->update($id, $data);

            activity()
                ->performedOn($ad)
                ->causedBy(auth()->user())
                ->log("Updated ad: {$ad->title}");

            return $ad;
        });
    }

    public function deleteAd($id)
    {
        return DB::transaction(function () use ($id) {
            $ad = $this->repository->find($id);
            $title = $ad?->title;

            $this->repository->delete($id);

            if ($title) {
                activity()
                    ->causedBy(auth()->user())
                    ->log("Deleted ad: {$title}");
            }

            return true;
        });
    }

    private function handleImageInput(array $data): array
    {
        if (isset($data['image']) && is_string($data['image'])) {
            $image = trim($data['image']);
            $image = preg_replace('/^[\\\\\/]+(https?:\\/\\/)/i', '$1', $image);
            $data['image'] = $image;
        }

        if (!isset($data['image']) || !($data['image'] instanceof \Illuminate\Http\UploadedFile)) {
            return $data;
        }

        $directory = public_path('img/ads');

        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $filename = time() . '_' . uniqid() . '_' . $data['image']->getClientOriginalName();
        $data['image']->move($directory, $filename);
        $data['image'] = 'img/ads/' . $filename;

        return $data;
    }
}
