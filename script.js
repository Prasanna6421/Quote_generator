      const quoteno = document.getElementById("quote-no");
      const quotetext = document.getElementById("quote-text");
      const quoteauthor = document.getElementById("quote-author");
      const dicebtn = document.getElementById("dice-btn");
      const errmsg = document.getElementById("err-msg");

      let controller;
      let quotedata = [];

      async function fetchdata() {
        if (controller) controller.abort();
        controller = new AbortController();
        const signal = controller.signal;

        try {
        //   errmsg.textContent = "";
          quotetext.textContent = "Loading data please wait.....";
          quoteauthor.textContent = "";

          const response = await fetch(
            `https://mimic-server-api.vercel.app/quotes?timestamp=${Date.now()}`,
            { signal }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          quotedata = await response.json();
          displayRandomQuote();
        } catch (err) {
          if (err.name === "AbortError") return;
          quotetext.textContent = "server error !!!!";
          errmsg.textContent = err.message;
        }
      }

      function displayRandomQuote() {
        if (!quotedata.length) return;

        const quoteindex = Math.floor(Math.random() * quotedata.length);
        const quote = quotedata[quoteindex];

        quoteno.textContent = `Quote #${quote.id}`;
        quotetext.textContent = quote.quote;
        quoteauthor.textContent = `- ${quote.author}`;
      }

      dicebtn.addEventListener("click", () => {
        if (!quotedata.length) {
          fetchdata();
        } else {
          displayRandomQuote();
        }
      });
