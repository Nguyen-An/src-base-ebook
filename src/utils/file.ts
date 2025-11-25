import { AxiosResponse } from 'axios';
import FileSaver from 'file-saver';

export function handleSaveFile(response: AxiosResponse) {
    try {
        const filename = decodeURI(response.headers['content-disposition'].split('filename=')[1].split(';')[0]).replaceAll('"', '');
        const type = response.headers['content-type'];
        const blob = new Blob([response.data], { type });
        FileSaver.saveAs(blob, filename);
    } catch (error) {
        console.log('error: ', error);
    }
}
