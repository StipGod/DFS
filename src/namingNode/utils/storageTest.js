const assert = require('assert');
const storage = require('./storage');

async function runTests() {
    // Test 1: Save a new file and check if it exists
    await storage.save('newFile', ['1.1.1.1', '2.2.2.2']);
    const exists = storage.exists('newFile');
    console.log('Test 1 result:', exists);
    assert.strictEqual(exists, true, 'newFile should exist after saving');

    // Test 2: Find the IPs of the saved file
    const ips = await storage.find('newFile');  // Add 'await' here
    console.log('Test 2 result:', ips);
    assert.deepStrictEqual(ips, ['1.1.1.1', '2.2.2.2'], 'IPs should match the saved values');
}

runTests().catch(error => {
    console.error('Test failed:', error.message);
});
