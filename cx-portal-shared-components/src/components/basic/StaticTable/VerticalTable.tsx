import { TableType } from './types'

export const VerticalTable = ({ data }: { data: TableType }) => (
  <table>
    <thead>
      <tr>
        {data.head.map((col) => (
          <th>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.body.map((row) => (
        <tr>
          {row.map((col) => (
            <td>{col}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)
