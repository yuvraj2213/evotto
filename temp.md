          <table
            border="1"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Location Name</th>
                <th style={{ width: "350px" }}>Link</th>{" "}
                {/* Fixed width for the Link column */}
                <th style={{ width: "90px" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {location.map((loc, index) => (
                <tr key={loc._id || index}>
                  <td>{loc.name}</td>
                  <td
                    style={{
                      width: "150px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <a
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "12px",
                        textDecoration: "none",
                        color: "white",
                        display: "block", // Ensures the link takes up the full width of its parent
                      }}
                    >
                      {loc.mapLink}
                    </a>
                  </td>
                  <td>
                    <button className='admin-delete-btn-locations' onClick={() => handleLocationDelete(loc._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>