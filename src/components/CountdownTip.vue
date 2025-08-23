<template>
    <div v-show="!isLoading" id="setTimeModal" style="display: flex; align-items: center;" class="py-1 px-2 rounded-md">
        <input id="minute" type="text" class="text-center pointer-events-none"
            :value="formatTime(timerService.minutes)" />
        <span style="padding: 0 5px">:</span>
        <input id="second" type="text" class="text-center  pointer-events-none"
            :value="formatTime(timerService.seconds)" />
        <a-tooltip v-if="!isRun" position="br">
            <div class="flex ml-2 items-center justify-center " style="height: 25px;">
                <icon-info-circle size="16px" class="cursor-pointer" />
            </div>
            <template #content>
                <div class="text-sm font-medium shadow-md">
                    <div class="flex items-center mb-1">
                        <svg t="1755921599827" class="mr-1" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6035" width="16" height="16">
                            <path
                                d="M512 192C332.8 192 192 332.8 192 512s140.8 320 320 320 320-140.8 320-320S691.2 192 512 192zM512 768c-140.8 0-256-115.2-256-256s115.2-256 256-256 256 115.2 256 256S652.8 768 512 768z"
                                fill="#e6e6e6" p-id="6036"></path>
                            <path
                                d="M544 499.2 544 320c0-19.2-12.8-32-32-32S480 300.8 480 320l0 192c0 6.4 6.4 19.2 6.4 25.6l102.4 102.4c6.4 6.4 12.8 6.4 25.6 6.4s19.2 0 25.6-6.4c12.8-12.8 12.8-32 0-44.8L544 499.2z"
                                fill="#e6e6e6" p-id="6037"></path>
                            <path
                                d="M364.8 192C364.8 185.6 358.4 179.2 358.4 172.8l0 0C320 140.8 256 140.8 217.6 172.8L172.8 217.6C140.8 256 140.8 320 172.8 358.4 179.2 358.4 185.6 364.8 192 364.8 224 288 288 224 364.8 192z"
                                fill="#e6e6e6" p-id="6038"></path>
                            <path
                                d="M851.2 217.6l-44.8-44.8c-38.4-38.4-96-38.4-134.4 0-6.4 6.4-6.4 12.8-12.8 19.2 76.8 38.4 140.8 96 172.8 172.8 6.4-6.4 12.8-6.4 19.2-12.8C883.2 320 883.2 256 851.2 217.6z"
                                fill="#e6e6e6" p-id="6039"></path>
                            <path
                                d="M262.4 780.8l-25.6 25.6c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 12.8 6.4 25.6 6.4s19.2 0 25.6-6.4l25.6-25.6c12.8-12.8 12.8-32 0-44.8S275.2 768 262.4 780.8z"
                                fill="#e6e6e6" p-id="6040"></path>
                            <path
                                d="M761.6 780.8c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l25.6 25.6c6.4 6.4 12.8 6.4 25.6 6.4s19.2 0 25.6-6.4c12.8-12.8 12.8-32 0-44.8L761.6 780.8z"
                                fill="#e6e6e6" p-id="6041"></path>
                        </svg>
                        专注 {{ timerService.minutes }} 分钟
                    </div>
                    <div class="flex items-center">
                        <svg t="1755921722533" class="mr-1" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="7370" width="16" height="16">
                            <path
                                d="M274.709943 643.525486a174.533486 174.533486 0 0 1-5.441829-14.204343 14.555429 14.555429 0 0 0-18.505143-9.230629 14.613943 14.613943 0 0 0-9.245257 18.490515c1.872457 5.632 3.978971 11.146971 6.334172 16.544914a14.599314 14.599314 0 0 0 19.221943 7.636114 14.628571 14.628571 0 0 0 7.636114-19.236571zM441.4464 754.322286c-56.714971 0-109.2608-26.3168-144.149943-72.177372a14.628571 14.628571 0 0 0-23.274057 17.7152c40.477257 53.204114 101.493029 83.719314 167.424 83.719315a14.628571 14.628571 0 1 0 0-29.257143zM766.434743 915.499886h-614.4a29.257143 29.257143 0 0 0 0 58.514285h614.4a29.257143 29.257143 0 0 0 0-58.514285z"
                                fill="#e6e6e6" p-id="7371"></path>
                            <path
                                d="M903.241143 434.527086c-1.448229-14.994286-14.058057-31.0272-29.125486-31.0272h-104.901486v-13.399772c0-32.314514-15.681829-74.371657-47.996342-74.371657H165.668571c-32.314514 0-54.740114 27.428571-54.740114 59.743086v181.057828c0 181.394286 150.615771 328.967314 332.010057 328.967315 125.074286 0 235.563886-70.173257 291.240229-173.173029 29.461943-4.344686 116.0192-21.386971 147.982628-64.014628 33.4848-44.617143 24.766171-175.455086 21.079772-213.781943z m-733.7984 27.487085h541.257143v58.514286h-541.257143v-58.514286z m541.257143-87.771428v58.514286h-541.257143v-58.514286h541.257143z m-270.628572 452.739657c-149.357714 0-270.628571-121.080686-270.628571-270.453029v-6.743771h541.257143v6.743771c0 149.372343-121.270857 270.453029-270.628572 270.453029z m396.010057-216.064c-10.1376 13.5168-45.480229 27.516343-76.960914 36.030171 8.367543-28.964571 10.079086-58.792229 10.079086-90.404571v-94.5152h77.838628c3.803429 73.128229 0.775314 133.2224-10.9568 148.8896zM432.757029 295.614171a29.257143 29.257143 0 0 0 29.257142-29.257142v-190.171429a29.257143 29.257143 0 0 0-58.514285 0v190.171429a29.257143 29.257143 0 0 0 29.257143 29.257142zM579.042743 295.614171a29.257143 29.257143 0 0 0 29.257143-29.257142v-190.171429a29.257143 29.257143 0 0 0-58.514286 0v190.171429a29.257143 29.257143 0 0 0 29.257143 29.257142zM286.471314 295.614171a29.257143 29.257143 0 0 0 29.257143-29.257142v-190.171429a29.257143 29.257143 0 0 0-58.514286 0v190.171429a29.257143 29.257143 0 0 0 29.257143 29.257142z"
                                fill="#e6e6e6" p-id="7372"></path>
                        </svg>
                        休息 5 分钟
                    </div>
                </div>
            </template>
        </a-tooltip>

    </div>
</template>
<script>
import { onMounted, reactive, toRefs, watch, unref, getCurrentInstance } from 'vue'
import { formatTime } from "@utils/format.js";
import { IconInfoCircle } from "@arco-design/web-vue/es/icon";


const TIP_TIME = 5;
export default {
    props: {
        isLoading: Boolean,
        isRun: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        IconInfoCircle,
    },
    setup(props) {
        const isDev = false;
        // const TIME = isDev ? (1000 * 6) : (1000 * 60 * 6);
        const { proxy } = getCurrentInstance();
        const { $emitter: emitter } = proxy;
        const { isLoading, isRun } = toRefs(props);
        const timerService = reactive({
            minutes: isDev ? 0 : 25,
            seconds: isDev ? 10 : 0,
            isRunning: false,
            timer: null,
        })

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
                            clearInterval(timerService.timer);
                            window.service.createRelaxBrowserWindow();
                            return;
                        }

                        timerService.minutes--
                        timerService.seconds = 59
                    } else {
                        timerService.seconds--
                    }
                }, 1000)
            }
            timerService.isRunning = true;
        }

        const stopTimer = () => {
            clearInterval(timerService.timer);
            timerService.isRunning = false;
        }

        const resetTimer = () => {
            clearInterval(timerService.timer);
            timerService.minutes = isDev ? 0 : 25;
            timerService.seconds = isDev ? 10 : 0;
            timerService.isRunning = false;
            toggleTimer();
        }


        if (unref(isRun)) {
            watch(isLoading, (value) => {
                if (timerService.seconds === 0 && timerService.minutes === 0) {
                    return;
                }
                if (value) {
                    stopTimer();
                    return;
                }
                toggleTimer();
            }, { immediate: true })


            onMounted(() => {
                emitter.off('reset-timer');
                emitter.on('reset-timer', resetTimer);
            })
        }


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