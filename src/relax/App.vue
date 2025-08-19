<template>
    <div class="container relative">
        <h1>休息倒计时</h1>
        <p class="status">距离休息结束还有</p>
        <div class="countdown" id="countdown">
            <div class="time-box">
                <p class="time" id="minutes">{{ formatTime(timerService.minutes) }}</p>
                <p class="label">分钟</p>
            </div>
            <div class="time-box">
                <p class="time" id="seconds">{{ formatTime(timerService.seconds) }}</p>
                <p class="label">秒</p>
            </div>
        </div>
        <div class="absolute right-3 top-3">
            <a-button @click="onClosePage" shape="round" status="danger">紧急情况</a-button>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { formatTime } from "@utils/format.js"

export default {
    setup() {
        const isDev = window?.utools?.isDev || false;
        const timerService = reactive({
            minutes: isDev ? 0 : 5,
            seconds: isDev ? 10 : 0,
            timer: null,
            isRunning: false,
        })

        const onClosePage = () => {
            window?.utools?.sendToParent("ping", "relax-end"); // 版本：>= 6.1.0
            window?.destroy();
            window?.close();
        }

        const toggleTimer = () => {
            if (timerService.isRunning) {
                clearInterval(timerService.timer)
            } else {
                timerService.timer = setInterval(() => {
                    if (timerService.seconds === 0) {
                        if (timerService.minutes === 0) {
                            clearInterval(timerService.timer)
                            onClosePage()
                            return
                        }
                        timerService.minutes--
                        timerService.seconds = 59
                    } else {
                        timerService.seconds--
                    }
                }, 1000)
            }
            timerService.isRunning = true
        }
        onMounted(toggleTimer)
        return {
            onClosePage,
            timerService,
            formatTime
        }
    },
}
</script>
<style>
html,
body {
    font-size: 16px;
}

body {
    background-color: #fefefe;
    text-align: center;
}

i {
    color: #777;
}

svg {
    width: 48px;
    height: 48px;
}


body {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a73e8, #34a853);
    font-family: '微软雅黑', Arial, sans-serif;
    color: white;
}

.container {
    background: rgba(255, 255, 255, 0.1);
    padding: 2.5rem 3rem;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

h1 {
    font-size: 2.5rem;
    margin: 0;
    margin-bottom: 1.5rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.status {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
}

.countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}

.time-box {
    background: rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 10px;
    min-width: 100px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.time {
    font-size: 3rem;
    font-weight: bold;
    color: white;
    margin: 0;
}

.label {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 0.5rem;
}
</style>