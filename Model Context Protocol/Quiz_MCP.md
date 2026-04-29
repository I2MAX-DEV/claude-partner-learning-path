# Model Context Protocol Quiz

## Question 1

You've created an MCP server and want to test your tools before connecting them to Claude. What's the best way to do this?

- [ ] Testing isn't needed for tools, Claude can figure out how to use them
- [ ] Connect to Claude immediately
- [x] Use the MCP Inspector in your browser
- [ ] Test in production

## Question 2

You're building a document system where users can type @document_name to reference files. What MCP feature is best for exposing the document contents?

- [ ] Tools
- [ ] Clients
- [ ] Prompts
- [x] Resources

## Question 3

Your MCP server and client need to communicate. What's the most common way they connect during development?

- [ ] Through a database
- [ ] Over the internet
- [x] Through standard input/output on the same machine
- [ ] Using email

## Question 4

You're building a chatbot that needs to access GitHub data. What is the main benefit of using MCP instead of writing your own GitHub integration?

- [ ] MCP requires less memory
- [x] MCP handles the tool definitions and execution for you
- [ ] MCP only works with GitHub
- [ ] MCP makes your chatbot run faster

## Question 5

You want to create a tool for your MCP server that reads document contents. Using the Python SDK, what's the easiest way to define this tool?

- [ ] Write a complex JSON schema manually
- [ ] Send an HTTP request
- [x] Use the @mcp.tool decorator on a function
- [ ] Create a separate configuration file

## Question 6

You want to provide users with a high-quality, pre-tested instruction for formatting documents. What MCP feature should you use?

- [ ] Resources
- [ ] Sessions
- [ ] Tools
- [x] Prompts
