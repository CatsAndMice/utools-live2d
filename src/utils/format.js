// 格式化时间显示，确保始终为两位数
export const formatTime = (time) => {
    return time.toString().padStart(2, '0')
}