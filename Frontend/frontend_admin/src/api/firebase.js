import axios from 'axios';

const firebase = axios.create({
    baseURL: 'https://acnapi-335c7.firebaseio.com',
    headers: {
        Authorization: 'AAAAXUUmPDQ:APA91bFJajcFmE9fDlE8TK-jbcf--2bZxpWIdZ-Oaz0xDmcXjHSY6GNzka63sNkXH1FQ5Oln3i4B_d05Rqsr7bfBuLCF4mnSF3OpIjBZLB05w0pIbUKq3rXuE-ZAFkLpOnVXx1Lnec5v-w'
    }
});

export default firebase;