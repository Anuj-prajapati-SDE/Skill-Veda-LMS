const http = require('http');

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsedBody });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAdminFunctions() {
  try {
    console.log('🔧 Resetting admin password...');
    
    // Reset existing admin password
    const resetResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/resetAdminPassword',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, { email: 'admin@example.com' });
    
    console.log('✅ Reset Response:', resetResponse);
    
    // Test login with the reset password
    console.log('\n🔐 Testing admin login...');
    
    const loginResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/loginAdmin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, { email: 'admin@example.com', password: 'admin123' });
    
    console.log('✅ Login Response:', loginResponse);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Also try creating a new test admin
async function createTestAdmin() {
  try {
    console.log('\n🆕 Creating test admin...');
    
    const createResponse = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/auth/createTestAdmin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Create Response:', createResponse);
    
  } catch (error) {
    console.error('❌ Create Error:', error.message);
  }
}

// Run the tests
async function runTests() {
  await testAdminFunctions();
  await createTestAdmin();
}

runTests();
