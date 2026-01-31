const http = require('http');

const BASE_URL = 'http://localhost:3000/api';
let createdBookId = null;

function request(url, options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: body ? JSON.parse(body) : null });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', reject);

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    try {
        console.log('\n[STEP] Get Books (Initial)');
        let res = await request(`${BASE_URL}/books`, { method: 'GET' });
        console.log('Status:', res.status);

        console.log('\n[STEP] Add Book (Admin)');
        res = await request(`${BASE_URL}/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-user-role': 'admin' }
        }, { title: 'Test Book', author: 'Test Author', stock: 5 });
        console.log('Status:', res.status);
        console.log('Data:', res.data);

        if (res.data && res.data.id) {
            createdBookId = res.data.id;
        } else {
            throw new Error('Failed to create book');
        }

        console.log('\n[STEP] Borrow Book (User)');
        res = await request(`${BASE_URL}/borrow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'user',
                'x-user-id': '101'
            }
        }, { bookId: createdBookId, latitude: -6.200, longitude: 106.800 });
        console.log('Status:', res.status);
        console.log('Data:', res.data);

        console.log('\n[STEP] Verify Stock Decrease');
        res = await request(`${BASE_URL}/books/${createdBookId}`, { method: 'GET' });
        console.log('Status:', res.status);
        console.log('Current Stock:', res.data ? res.data.stock : 'Unknown');

    } catch (err) {
        console.error('Test Failed:', err);
    }
}

// Check if server is up then run
setTimeout(runTests, 2000);
