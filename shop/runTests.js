const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Function to check if a package is installed
const isPackageInstalled = (packageName) => {
  try {
    require.resolve(packageName);
    return true;
  } catch (e) {
    return false;
  }
};

// Function to install missing packages
const installPackages = (packages) => {
  return new Promise((resolve, reject) => {
    exec(`npm install --save-dev ${packages.join(' ')}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing packages: ${stderr}`);
      } else {
        console.log(`Successfully installed packages: ${packages.join(', ')}`);
        resolve();
      }
    });
  });
};

// Function to get all test files from the specified directory
const getTestFiles = (directory) => {
  return fs.readdirSync(directory)
    .filter(file => file.endsWith('.test.js'))
    .map(file => path.join(directory, file));
};

// Main function to run tests
const runTests = async () => {
  const args = process.argv.slice(2); // Get command line arguments
  const testDirectory = {
    cart: './cart', // Directory for cart tests
    security: './security', // Directory for security tests
    all: './' // Run all tests from root directory
  };
  
  let selectedTests = [];

  if (args.includes('cart')) {
    selectedTests = getTestFiles(testDirectory.cart);
  } else if (args.includes('security')) {
    selectedTests = getTestFiles(testDirectory.security);
  } else if (args.includes('all')) {
    selectedTests = [
      ...getTestFiles(testDirectory.cart),
      ...getTestFiles(testDirectory.security)
    ];
  } else {
    console.log('No valid category specified. Please use "cart", "security", or "all".');
    return;
  }

  // Check for required packages
  const requiredPackages = ['jest'];
  const missingPackages = requiredPackages.filter(pkg => !isPackageInstalled(pkg));

  if (missingPackages.length > 0) {
    console.log('Missing packages detected. Installing:', missingPackages.join(', '));
    await installPackages(missingPackages);
  }

  // Execute tests
  for (const testFile of selectedTests) {
    console.log(`Running tests in: ${testFile}`);
    exec(`jest ${testFile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running tests in ${testFile}: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout:\n${stdout}`);
    });
  }
};

// Execute the main function
runTests().catch(error => {
  console.error(error);
});
