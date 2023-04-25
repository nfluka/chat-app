const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return `${date.getHours()}:${date.getMinutes()}`
}

export default formatDate;