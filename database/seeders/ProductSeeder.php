<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = Customer::all();

        $products = [
            [
                'name' => 'Door Frame Component',
                'description' => 'High-precision door frame component for automotive 4W, manufactured using cold stamping and robotic welding.',
                'customer_keyword' => 'ADIENT',
            ],
            [
                'name' => 'Brake Pedal Assembly',
                'description' => 'Critical safety component for automotive 2W, ensuring reliable braking performance under extreme conditions.',
                'customer_keyword' => 'ADYAWINSA',
            ],
            [
                'name' => 'Exhaust Muffler Bracket',
                'description' => 'Durable exhaust bracket designed for heat resistance and vibration dampening.',
                'customer_keyword' => 'AISIN',
            ],
            [
                'name' => 'Instrument Panel Support',
                'description' => 'Complex structural support for the dashboard area, integrating multiple mounting points.',
                'customer_keyword' => 'AUTO ASKA',
            ],
            [
                'name' => 'Engine Mount Bracket',
                'description' => 'Strong, heavy-duty bracket that secures the engine to the chassis, absorbing engine vibrations.',
                'customer_keyword' => 'BONECOM',
            ],
            [
                'name' => 'Chassis Crossmember',
                'description' => 'Structural part for truck frames, providing torsional rigidity and support.',
                'customer_keyword' => 'DAECHANG',
            ],
            [
                'name' => 'Fuel Tank Protection Plate',
                'description' => 'Protective plate for fuel tanks, manufactured with high-strength steel.',
                'customer_keyword' => 'FSCM',
            ],
            [
                'name' => 'Suspension Arm',
                'description' => 'Precision suspension component for smooth vehicle handling and stability.',
                'customer_keyword' => 'FUJI SEAT',
            ],
            [
                'name' => 'Transmission Case Support',
                'description' => 'Support component for heavy transmission systems in commercial vehicles.',
                'customer_keyword' => 'FUJI TECHNICA',
            ],
            [
                'name' => 'Motorcycle Frame Side Rail',
                'description' => 'Lightweight yet strong structural rail for motorcycle frames.',
                'customer_keyword' => 'FUTABA',
            ],
        ];

        foreach ($products as $pData) {
            $customer = null;
            if ($pData['customer_keyword']) {
                $customer = $customers->filter(function ($c) use ($pData) {
                    return str_contains(strtoupper($c->name), $pData['customer_keyword']);
                })->first();
            }

            $product = Product::create([
                'name' => $pData['name'],
                'slug' => \Illuminate\Support\Str::slug($pData['name']),
                'description' => $pData['description'],
                'customer_id' => $customer ? $customer->id : null,
                'main_image' => 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=800', // Default automotive stamping
                'is_active' => true,
                'meta_title' => $pData['name'] . ' - PT Tri Centrum Fortuna',
                'meta_description' => $pData['description'],
                'meta_keywords' => 'stamping, welding, automotive parts, ' . $pData['name'],
            ]);

            // Add some additional images for the gallery
            $galleryImages = [
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1531297461136-82lw8e41f5e8?auto=format&fit=crop&q=80&w=800',
            ];

            foreach ($galleryImages as $imgPath) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imgPath,
                ]);
            }
        }
    }
}
