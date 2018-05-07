export default {
    // 只能有两个参数，更多参数使用（state, {num1, num2}）
    updateCount(state, data) {
        state.count = data.num
    }
}
