
import 'isomorphic-fetch';
import React from 'react';
import styled from 'styled-components';
import {TablularData} from './table';
import { useDataSSR } from './useDataSSR';

const Heading = styled.h1`
font-size: 2em;
text-align: center;
font-weight: bold;
font-family: serif;
color: #fcae16;
`;

function App() {

  const posts = useDataSSR('posts',()=>  fetch('http://localhost:8080/api/posts')
      .then(res => res.json())
  );
 const comments = useDataSSR('comments',()=> fetch('http://localhost:8080/api/comments')
     .then(res => res.json())
 );
const users = useDataSSR('users',()=>  fetch('http://localhost:8080/api/users')
  .then(res => res.json())
);

  return (
    <div className="App">
      <header className="App-header">
        <Heading>Motilal Oswal Assignment</Heading>
      </header>
      <main>
        <section>
          {users && <TablularData data={users} 
                        columns={['ID','Name','Username','Email','Street','Suite','City','Zip Code','Lat','Lang','Phone','Website','Company Name','Catch Phrase','BS']}
                        caption="User List"
            /> }
        </section>
        <section>
          {posts && <TablularData data={posts} 
                        columns={['User ID','Post ID','Title','Body']}
                        caption="Post List"
            /> }
        </section>
        <section>
          {comments && <TablularData data={comments} 
                      columns={['Post ID','ID','Name','Email','Body']}
                      caption="Comment List"
          /> } 
        </section>
      </main>
    </div>
  );
}

export default App;
