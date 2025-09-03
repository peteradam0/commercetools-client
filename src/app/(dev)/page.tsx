export default function IndexPage() {
  return (
    <div>
      <h2>Link Collection</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: 5, border: '1px solid black' }}>Ping Page</td>
            <td style={{ padding: 5, border: '1px solid black' }}>
              <a style={{ textDecoration: 'underline' }} href={'/ping'}>
                /ping
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Page</th>
              <th>EN / EN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 5, border: '1px solid black' }}>/home</td>
              <td style={{ padding: 5, border: '1px solid black' }}>
                <a style={{ textDecoration: 'underline' }} href={'/en/home'}>
                  Home Page
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
