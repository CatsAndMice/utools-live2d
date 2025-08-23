<template>
    <div class="container relative">
        <div class="content-wrapper">
            <h1>休息倒计时</h1>
            <p class="status">距离休息结束还有</p>
            <div class="countdown" id="countdown">
                <div class="time-box">
                    <p class="time" id="minutes">{{ formatTime(timerService.minutes) }}</p>
                    <p class="label">分钟</p>
                </div>
                <div class="time-separator">:</div>
                <div class="time-box">
                    <p class="time" id="seconds">{{ formatTime(timerService.seconds) }}</p>
                    <p class="label">秒</p>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress" :style="{ width: progressWidth + '%' }"></div>
            </div>
        </div>
        <div class="absolute right-3 top-3">
            <button class="emergency-btn" @click="onClosePage">紧急情况</button>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted, computed } from 'vue'
import { formatTime } from "@utils/format.js"

export default {
    setup() {
        const isDev = false;
        const totalSeconds = isDev ? 10 : 300; // 5分钟 = 300秒
        const timerService = reactive({
            minutes: isDev ? 0 : 5,
            seconds: isDev ? 10 : 0,
            timer: null,
            isRunning: false,
            startTime: 0,
            elapsedTime: 0
        })

        const progressWidth = computed(() => {
            const currentSeconds = timerService.minutes * 60 + timerService.seconds;
            return (currentSeconds / totalSeconds) * 100;
        });

        const onClosePage = () => {
            window?.utools?.sendToParent("ping", "relax-end"); // 版本：>= 6.1.0
            window?.destroy();
            window?.close();
        }

        // 在toggleTimer函数中移除对animateTime的调用
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

        const toggleTimer = () => {
            if (timerService.isRunning) {
                clearInterval(timerService.timer)
            } else {
                timerService.startTime = Date.now();
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
            formatTime,
            progressWidth
        }
    },
}
</script>
<style>
html,
body {
    font-size: 16px;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url('~@assets/bg.png');
    background-size: cover;
    background-position: center center;
    font-family: '微软雅黑', Arial, sans-serif;
    color: white;
}

.container {
    position: relative;
    background: rgba(255, 255, 255, 0.15);
    padding: 3rem 4rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    overflow: hidden;
}

.container::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: -1;
}

.content-wrapper {
    position: relative;
    z-index: 1;
}

.container h1 {
    font-size: 2.8rem;
    margin: 0;
    margin-bottom: 1.5rem;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    font-weight: 700;
    letter-spacing: 1px;
}

.status {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
}

.countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
}

.time-box {
    background: rgba(255, 255, 255, 0.2);
    padding: 1.5rem 2rem;
    border-radius: 16px;
    /* min-width: 120px; */
    width: 130px;
    /* 固定宽度 */
    text-align: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.time {
    font-size: 3.5rem;
    font-weight: bold;
    color: white;
    margin: 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    font-family: 'Courier New', monospace;
    /* 使用等宽字体 */
    width: 100%;
    /* 确保宽度填满父容器 */
}

.time-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.time-separator {
    font-size: 3rem;
    font-weight: bold;
    margin: 0 0.5rem;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.time {
    font-size: 3.5rem;
    font-weight: bold;
    color: white;
    margin: 0;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}


.label {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 0.5rem;
    font-weight: 400;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 1rem;
}

.progress {
    height: 100%;
    background: linear-gradient(90deg, #00c6ff, #0072ff);
    border-radius: 10px;
    transition: width 1s linear;
}

.emergency-btn {
    background: linear-gradient(90deg, #8e44ad, #9b59b6);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
    transition: all 0.3s ease;
    opacity: 0.85;
}

.emergency-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(155, 89, 182, 0.5);
    opacity: 1;
}

.emergency-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(255, 75, 43, 0.4);
}
</style>