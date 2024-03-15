export default function TooManyRequests() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <h1>Too Many Requests</h1>
            <p>Sorry, you have made too many requests. Please try again later.</p>
        </div>
    )
}
