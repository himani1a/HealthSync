/** image to base64 */
export default function imageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = (error) => {
        reject(error);
        }
    });
}