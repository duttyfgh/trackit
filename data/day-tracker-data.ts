export type weatherType =
    | 'sunny'
    | 'partly_cloudy'
    | 'cloudy'
    | 'lightning'
    | 'rain'
    | 'thunderstorm'
    | 'rain_and_sun'
    | 'snowy'
    | 'windy'
    | 'foggy'
    | 'tornado'
    | 'frosty'
    | '...'

export const moods = [
    {
        emoji: '/emojis/happy.png',
        title: 'Happy, Joyful, Motivated',
        color: '',
        value: 6,
    },
    {
        emoji: '/emojis/slightly-smiling.png',
        title: 'Basic, Calm, Peaceful',
        color: '',
        value: 5,
    },
    {
        emoji: '/emojis/sad.png',
        title: 'Sad, Upset, Hurt',
        color: '#91CDFD',
        value: 4,
    },
    {
        emoji: '/emojis/without-mouth.png',
        title: 'Tired, Empty, Apathetic',
        color: '#E4FD91',
        value: 3,
    },
    {
        emoji: '/emojis/anxiety.png',
        title: 'Anxious, Fearful, Stressed',
        color: '#B991FD',
        value: 2,
    },
    {
        emoji: '/emojis/angry.png',
        title: 'Anger, Irritated, Annoyed',
        color: '#FDBE91',
        value: 1,
    },
]

export const anxietyLevels = [
    {
        emoji: '/emojis/calm.png',
        title: 'Complete Calm',
        description: 'No anxiety or stress at all. You feel centered, relaxed, and in full control of your thoughts and actions.',
        value: 5,
    },
    {
        emoji: '/emojis/without-mouth.png',
        title: 'Low tension',
        description: 'A light sense of unease or restlessness. Noticeable, but not disruptive — easy to ignore or shake off.',
        value: 4,
    },
    {
        emoji: '/emojis/confused.png',
        title: 'Moderate anxiety',
        description: 'You feel clearly anxious. Racing thoughts, trouble concentrating, maybe physical symptoms (tight chest, shallow breathing) — but still functioning normally.',
        value: 3,
    },
    {
        emoji: '/emojis/downcast.png',
        title: 'Severe anxiety',
        description: 'Strong, persistent anxiety. It’s hard to focus, you may feel overwhelmed, and it affects your behavior or decision-making.',
        value: 2,
    },
    {
        emoji: '/emojis/yelling.png',
        title: 'Anxiety, Fear, Stressed',
        description: 'Completely overpowering anxiety, leaving you unable to focus, act, or feel in control. Your mind and body feel locked or panicked.',
        value: 1,
    },

]

export const weathers: { img: string, title: weatherType }[] = [
    {
        img: '',
        title: '...'
    },
    {
        img: '/emojis/sun.png',
        title: 'sunny'
    },
    {
        img: '/emojis/party-cloudy.png',
        title: 'partly_cloudy'
    },
    {
        img: '/emojis/cloud.png',
        title: 'cloudy'
    },
    {
        img: '/emojis/lightning.png',
        title: 'lightning'
    },
    {
        img: '/emojis/rain.png',
        title: 'rain'
    },
    {
        img: '/emojis/thunderstorm.png',
        title: 'thunderstorm'
    },
    {
        img: '/emojis/rain-and-sun.png',
        title: 'rain_and_sun'
    },
    {
        img: '/emojis/snow.png',
        title: 'snowy'
    },
    {
        img: '/emojis/wind.png',
        title: 'windy'
    },
    {
        img: '/emojis/fog.png',
        title: 'foggy'
    },
    {
        img: '/emojis/tornado.png',
        title: 'tornado'
    },
    {
        img: '/emojis/frost.png',
        title: 'frosty'
    }
]
