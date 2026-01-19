<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Generate by Antigravity
     */
    public function run(): void
    {
        $news = [
            [
                'title' => 'TCF Expands Production Capacity for EV Components',
                'category' => 'Industry',
                'excerpt' => 'PT Tri Centrum Fortuna announces a major expansion in stamping facilities to support growing Electric Vehicle demand.',
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Achieving IATF 16949 Excellence: Our Commitment to Quality',
                'category' => 'Corporate',
                'excerpt' => 'Our recent quality audit highlights the rigorous standards TCF maintains for automotive safety and reliability.',
                'image' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Digital Transformation in Stamping Processes',
                'category' => 'Technology',
                'excerpt' => 'How TCF is integrating IoT and real-time monitoring to optimize precision and reduce waste in manufacturing.',
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Sustainability Initiatives: Reducing Carbon Footprint',
                'category' => 'General',
                'excerpt' => 'TCF implements solar panel systems and waste recycling programs to become a greener manufacturing leader.',
                'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Supporting Local Talent: TCF Apprenticeship Program',
                'category' => 'CSR',
                'excerpt' => 'Empowering the next generation of Indonesian engineers through our specialized vocational training program.',
                'image' => 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'The Future of Cold Stamping in 2026',
                'category' => 'Technical',
                'excerpt' => 'Insights into the latest trends in high-tensile steel processing for lightweight vehicle structures.',
                'image' => 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Strategic Partnership with Global Automotive Tier-1',
                'category' => 'Business',
                'excerpt' => 'TCF signs a multi-year agreement to supply structural components for upcoming SUV models.',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Automation and Robotics: Leveling Up Precision',
                'category' => 'Technology',
                'excerpt' => 'Investing in the latest robotic welding cells to ensure consistent quality across high-volume production.',
                'image' => 'https://images.unsplash.com/photo-1565515267482-75f7452e8753?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Employee Safety: Reaching 1 Million Safe Man-Hours',
                'category' => 'Corporate',
                'excerpt' => 'Celebrating our safety milestone and the continuous improvement of our occupational health systems.',
                'image' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Precision Welding vs Metal Stamping: A Deep Dive',
                'category' => 'Technical',
                'excerpt' => 'Understanding the integration of two core manufacturing methods for complex structural assemblies.',
                'image' => 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'TCF Presence at International Manufacturing Expo',
                'category' => 'Events',
                'excerpt' => 'Showcasing our precision capabilities to global stakeholders at the annual industry summit.',
                'image' => 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Innovating for Safety: Structural Reinforcements',
                'category' => 'Technical',
                'excerpt' => 'How our stamped parts contribute to the 5-star crash test ratings of modern vehicles.',
                'image' => 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Manufacturing Resilience in the Post-Pandemic Era',
                'category' => 'Business',
                'excerpt' => 'Adapting supply chains and production schedules for better stability and reliability.',
                'image' => 'https://images.unsplash.com/photo-1553034114-1681284d720b?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Annual Community Health Day 2025',
                'category' => 'CSR',
                'excerpt' => 'TCF provides medical check-ups and nutritional support for 500 residents near our factory area.',
                'image' => 'https://images.unsplash.com/photo-1505751172107-160682046481?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'title' => 'Precision Die Maintenance: Ensuring Longevity',
                'category' => 'Technical',
                'excerpt' => 'The science behind maintaining stamping dies for consistent part quality over millions of cycles.',
                'image' => 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop',
            ],
        ];

        foreach ($news as $item) {
            News::create([
                'title' => $item['title'],
                'slug' => Str::slug($item['title']),
                'category' => $item['category'],
                'content' => "This is the full content for the article titled '" . $item['title'] . "'. " . str_repeat("Providing high-quality manufacturing solutions since 2004, PT Tri Centrum Fortuna has established itself as a leader in cold stamping and assembly services. ", 5),
                'excerpt' => $item['excerpt'],
                'image' => $item['image'],
                'meta_title' => $item['title'] . " | TCF News",
                'meta_description' => $item['excerpt'],
                'is_published' => true,
                'published_at' => now()->subDays(rand(1, 30)),
            ]);
        }
    }
}
