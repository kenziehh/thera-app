import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'
import NewsCard from '../components/NewsCard'


const newsData = [
    {
        title: "Tau gak sih Tuna tuh baik untuk kesehatan mata kita",
        content: "Tuna mengandung vitamin A dan omega-3 yang membantu menjaga kesehatan mata dan mencegah degenerasi makula.",
        duration: "3 min read"
    },
    {
        title: "Manfaat Berjalan Kaki Setiap Pagi",
        content: "Berjalan kaki di pagi hari dapat meningkatkan sirkulasi darah, memperbaiki mood, dan menjaga kesehatan jantung.",
        duration: "2 min read"
    },
    {
        title: "Pentingnya Tidur yang Cukup untuk Imunitas",
        content: "Tidur cukup membantu tubuh memproduksi sel imun yang melawan infeksi dan mempercepat pemulihan.",
        duration: "2 min read"
    },
    {
        title: "Minum Air Putih Secara Teratur",
        content: "Konsumsi air putih yang cukup membantu menjaga fungsi organ tubuh dan mencegah dehidrasi.",
        duration: "1 min read"
    },
    {
        title: "Rajin Cuci Tangan Cegah Penyakit",
        content: "Mencuci tangan dengan sabun secara rutin dapat mencegah penyebaran virus dan bakteri penyebab penyakit.",
        duration: "1 min read"
    },
]


export default function NewsWidget() {
    return (
        <View className='flex flex-col gap-3 px-6'>
            <Text className='text-black-500 font-bold text-2xl' >Hospital Update</Text>
            <View className='flex flex-col gap-4'>
                {newsData.map((news, index) => (
                    <NewsCard
                        key={index}
                        title={news.title}
                        content={news.content}
                        duration={news.duration}
                    />
                ))}
            </View>
        </View>
    )
}
