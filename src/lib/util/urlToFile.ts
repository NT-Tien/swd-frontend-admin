export async function urlToFile(url: string, fileName: string, mimeType: string): Promise<File> {
    const response = await fetch(url)
    const data = await response.blob()
    return new File([data], fileName, {
        type: mimeType,
    })
}
