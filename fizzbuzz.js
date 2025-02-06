/**
 * Subject
 * 
 * Display numbers between 1 and N by following the rules:
 * if number can be divided by 3: display Fizz ;
 * if number can be divided by 5: display Buzz ;
 * if number can be divided by 3 AND 5 : display FizzBuzz ;
 * else: display the number.
 * 
 * @param {number} N
 * @returns {void}
 *  */ 

// function fastFizzBuzz(randomNum) {
//   for(let i = 1; i <= randomNum; i++){
//     console.log((i % 3=== 0 ? "Fizz" : "") + (i % 5 === 0 ? "Buzz" : "") || i);
//   };
// };

// fastFizzBuzz(10000);

const readableFizzBuzz = (randomNum, counter = 1) => {
  if (counter > randomNum) return;

  if (counter % 5 === 0 && counter  % 3 === 0) console.log('FizzBuzz');
  else if (counter % 5 === 0) console.log('Buzz');
  else if (counter  % 3 === 0) console.log('Fizz');
  else console.log(counter);

  readableFizzBuzz(randomNum, counter + 1);
};

readableFizzBuzz(10000);
