export default function IndexPage() {
  return (
    <div className='m-3'>
      <h2>Link Collection</h2>
      <table style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
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
      <div style={{ marginTop: '10px ' }}>
        <table style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Page</th>
              <th>en-US</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 5, border: '1px solid black' }}>Home</td>
              <td style={{ padding: 5, border: '1px solid black' }}>
                <a style={{ textDecoration: 'underline' }} href={'/en-US/home'}>
                  /home
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
