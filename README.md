# Steps

1. Show problem with `main1-1.js` (Reference `main1-2.js`)
   - Problem: Unable to send pokemon to daycare when there are no pokemon
   - Use `setTimeout` to display a big band-aid for the solution
   - Explain why timeout is not reliable
   - Reference `main1-2.js` for solution
2. Show Fix using CallBack with `main2-1.js` (Reference `main2-2.js`)
   - Demonstrate the benefits of using callback
     - Benefits: Able to call a function through a function
     - Cons: Can lead to CALLBACK HELL!!
3. Show Fix using promise with `main3-1.js` (Reference `main3-2.js`)
   - Demonstrate how to use promises and how it fixes CallBackHell
     - Benefits: Able to flatten and easier organize the code with promises in comparison to callback
4. Show The user of Async/Await with `main4-1` (Reference `main4-2.js`)

   - Explain about Async:
     - Async is a keyword that can be placed before a function
     - Async will ALWAYS return a promise. If the code returns a non-promise, javascript will automatically wrap it into a resolved promise

   ```
   async function f() {
       return 1;
   }

   f().then(alert); // 1
   ```

   ```
   async function f() {
       return Promise.resolve(1);
   }

   f().then(alert); // 1
   ```

   - Explain about Await:
     - It can only be used within an `Async` function
     - Waits until the promise is settled and returns its result

script(src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,fetch,es6")
