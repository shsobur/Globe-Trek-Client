import "./Candidates.css";

const Candidates = () => {
  return (
    <div className="manage-candidates">
      <h2>Manage Candidates</h2>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>User</td>
            <td>
              <button className="accept">Accept</button>
              <button className="reject">Reject</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>Tourist</td>
            <td>
              <button className="accept">Accept</button>
              <button className="reject">Reject</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;