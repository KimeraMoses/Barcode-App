// import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Heading, Table, Modal } from 'components';
import { exportToExcel } from 'utils';
import { handleFileUpload, columns, data } from './utils';
import { AddUser } from './sections';
import './AllUsers.styles.scss';

function AllUsers() {
  const [modal, setModal] = useState(false);

  const inputFile = useRef(null);
  const buttons = [
    { onClick: () => inputFile.current.click(), title: 'Import CSV', variant: 'secondary' },
    {
      onClick: () => exportToExcel(data, 'all-users Users'),
      title: 'Export CSV',
      variant: 'secondary'
    },
    { title: 'Addd New User', onClick: () => setModal(true) }
  ];

  return (
    <div className="all-users">
      <Modal showModal={modal} heading="Add New User" content={<AddUser setModal={setModal} />} />
      <div>
        <Heading>All Users</Heading>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <Table columns={columns} data={data} buttons={buttons} />
      </div>
    </div>
  );
}

export default AllUsers;
