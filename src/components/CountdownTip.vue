<template>
    <div v-show="!isLoading" id="setTimeModal" style="display: flex; align-items: center;" class="py-1 px-2 rounded-md">

        <input id="minute" type="text" class="text-center pointer-events-none"
            :value="formatTime(timerService.minutes)" />
        <span style="padding: 0 5px">:</span>
        <input id="second" type="text" class="text-center pointer-events-none"
            :value="formatTime(timerService.seconds)" />


    </div>
</template>
<script>
import { reactive, toRefs, watch } from 'vue'
const TIP_TIME = 5
export default {
    props: {
        isLoading: Boolean,
    },
    setup(props) {
        const { isLoading } = toRefs(props)
        const timerService = reactive({
            minutes: 0,
            seconds: 10,
            isRunning: false,
            timer: null,
        })

        // 格式化时间显示，确保始终为两位数
        const formatTime = (time) => {
            return time.toString().padStart(2, '0')
        }

        const toggleTimer = () => {
            if (timerService.isRunning) {
                clearInterval(timerService.timer)
            } else {
                timerService.timer = setInterval(() => {
                    if (timerService.seconds === TIP_TIME && timerService.minutes === 0) {
                        window.emitter.emit('tip', {
                            text: TIP_TIME + '秒后开始休息～',
                            priority: 99,
                            timeout: 2000
                        })
                    }

                    if (timerService.seconds === 0) {
                        if (timerService.minutes === 0) {
                            clearInterval(timerService.timer)
                            // 时间到
                            // window.emitter.emit('tip', {
                            //     text: '休息时间到了～',
                            //     priority: 99,
                            //     timeout: 3000
                            // })
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

        const stopTimer = () => {
            clearInterval(timerService.timer)
            timerService.isRunning = false
        }

        // const resetTimer = () => {
        //     clearInterval(timerService.timer)
        //     timerService.minutes = 25
        //     timerService.seconds = 0
        //     timerService.isRunning = false
        //  timerService.isEnd = false
        // }

        watch(isLoading, (value) => {
            if (timerService.seconds === 0 && timerService.minutes === 0) {
                return
            }
            if (value) {
                stopTimer()
                return
            }
            toggleTimer()
        }, { immediate: true })
        return {
            timerService,
            formatTime
        }
    },
}
</script>
<style scoped>
input,
button {
    background: none;
    outline: none;
    border: none;
}

input:focus {
    border: none;
}


#setTimeModal {
    position: absolute;
    z-index: 99;
    background-color: rgba(236, 217, 188, 0.5);
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    -webkit-user-drag: none;
    outline: none;
    border: none;
}

#setTimeModal input {
    border: 1px dashed rgb(158, 153, 147);
    width: 25px;
    height: 25px;
    border-radius: 5px;
}

#setTimeModal button {
    font-size: 12px;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 5px;
    transition: 0.5s all ease-in-out;
    border: 1px solid #fffae6;
}

#setTimeModal button:hover {
    border: 1px solid rgb(158, 153, 147);
}
</style>