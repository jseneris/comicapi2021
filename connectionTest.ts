import testConnection from './utils/testConnection';

export default async function hello() {
  console.log('hello');

  await testConnection();
  process.exit(0);
}

hello();
console.log('goodbye');
