// __mocks__/react-router-dom.js
module.exports = {
  useParams: () => ({ listId: "1" }),
  useNavigate: () => jest.fn(),
  // Optionally, add other exports if your tests need them:
  BrowserRouter: ({ children }) => children,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  // ...any other parts you need to mock
};
