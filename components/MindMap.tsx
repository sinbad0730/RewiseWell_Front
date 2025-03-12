import React, { useEffect, useRef, useState } from 'react';
import { Network, DataSet } from 'vis-network/standalone/esm/vis-network';

interface Node {
  id: string;
  label: string;
  notes?: string;
  imageUrl?: string;
  parentId?: string;
}

interface Edge {
  id: string;  // Add this line
  from: string;
  to: string;
}

const MindMap: React.FC = () => {
  const networkContainer = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Node | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [jsonData, setJsonData] = useState({
    studentID: 'placeholderID',
    subject: 'computer science',
    units: {},
  });

  useEffect(() => {
    if (networkContainer.current) {
      // Updated nodes with notes and imageUrl
      const nodes: Node[] = [
        { id: '1', label: 'Computer\nSystems', notes: 'Intro to computer systems', imageUrl: 'https://via.placeholder.com/150' },
        { id: '2', label: 'Data\nRepresentation', parentId: '1', notes: 'Discusses binary and hexadecimal systems', imageUrl: 'https://via.placeholder.com/150' },
        { id: '3', label: 'Data\nTransmission', parentId: '1', notes: 'Covers data transmission methods', imageUrl: 'https://via.placeholder.com/150' },
        { id: '4', label: 'Hardware', parentId: '1', notes: 'Components of computer hardware', imageUrl: 'https://via.placeholder.com/150' },
        { id: '5', label: 'Software', parentId: '1', notes: 'Types and functions of software', imageUrl: 'https://via.placeholder.com/150' },
        { id: '6', label: 'The Internet\nand its Uses', parentId: '1', notes: 'Introduction to the Internet', imageUrl: 'https://via.placeholder.com/150' },
        { id: '7', label: 'Automated and\nEmerging Technologies', parentId: '1', notes: 'Focus on AI and robotics', imageUrl: 'https://via.placeholder.com/150' },
        { id: '8', label: 'Algorithms,\nProgramming,\nand Logic', notes: 'Foundational concepts in programming', imageUrl: 'https://via.placeholder.com/150' },
        { id: '9', label: 'Algorithm Design\nand Problem-Solving', parentId: '8', notes: 'Strategies for algorithm design', imageUrl: 'https://via.placeholder.com/150' },
        { id: '10', label: 'Programming', parentId: '8', notes: 'Introduction to programming concepts', imageUrl: 'https://via.placeholder.com/150' },
        { id: '11', label: 'Databases', parentId: '8', notes: 'Basics of database management', imageUrl: 'https://via.placeholder.com/150' },
        { id: '12', label: 'Boolean\nLogic', parentId: '8', notes: 'Fundamentals of Boolean logic', imageUrl: 'https://via.placeholder.com/150' }
      ].map(node => ({
        ...node,
        shape: 'circle',
        size: 30,
        font: { size: 12, face: 'Arial', multi: true },
        color: { background: '#3498db', border: '#2980b9' }
      }));

      // Create edges based on parentId
      const edges: Edge[] = nodes
        .filter(node => node.parentId)
        .map(node => ({
          id: `${node.parentId}-${node.id}`,  // Add this line
          from: node.parentId!,
          to: node.id
        }));

      const nodesDataSet = new DataSet(nodes);
      const edgesDataSet = new DataSet(edges);

      const data = {
        nodes: nodesDataSet,
        edges: edgesDataSet,
      };

      const options = {
        layout: { improvedLayout: true },
        physics: {
          enabled: true,
          solver: 'repulsion',
          repulsion: {
            nodeDistance: 250,
            springLength: 200,
            damping: 0.1,
          },
        },
        nodes: {
          borderWidth: 2,
          color: {
            background: '#ffffff',
            border: '#666',
            highlight: { background: '#ffeb3b', border: '#333' },
          },
        },
        edges: {
          color: { color: '#bbbbbb' },
          width: 2,
          smooth: {
            enabled: true,  // Add this line
            type: 'continuous',
            roundness: 0.5
          },
        },
        interaction: { dragNodes: true, dragView: true, zoomView: true },
      };

      const network = new Network(networkContainer.current, data, options);

      network.once('stabilized', () => {
        network.focus('1', {
          scale: 1.3,
          animation: { duration: 800, easingFunction: 'easeInOutQuad' }
        });
      });

      network.on('click', (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          const clickedNode = nodes.find((node) => node.id === nodeId);
          if (clickedNode) {
            setModalContent(clickedNode);
            setIsModalOpen(true);
            setIsEditing(false);
            setNewImage(null);
          }
        }
      });

      return () => network.destroy();
    }
  }, []);

  return (
    <div>
      <h1>Computer Science Mind Map</h1>
      <div ref={networkContainer} style={{ width: '100%', height: '600px', border: '1px solid lightgray' }} />

      {isModalOpen && modalContent && (
        <div className="modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#f9f9f9', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '750px', fontFamily: 'Arial, sans-serif', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '15px' }}>{modalContent.label}</h2>
          {!isEditing ? (
            <p style={{ whiteSpace: 'pre-line', fontSize: '16px', color: '#444', lineHeight: '1.6', marginBottom: '15px' }}>{modalContent.notes || 'No notes available'}</p>
          ) : (
            <textarea value={modalContent.notes || ''} onChange={(e) => setModalContent({ ...modalContent, notes: e.target.value })} placeholder="Add notes here..." style={{ width: '100%', height: '150px', marginBottom: '15px', padding: '10px', borderRadius: '5px', fontFamily: 'Arial, sans-serif', fontSize: '14px' }} />
          )}
          <div style={{ marginBottom: '15px', textAlign: 'center' }}>
            <img src={newImage || modalContent.imageUrl || 'https://via.placeholder.com/300x150.png?text=Placeholder+Image'} alt="Uploaded" style={{ width: '300px', height: '150px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setIsImageOpen(true)} />
          </div>
          <input type="file" onChange={(e) => { if (e.target.files && e.target.files[0]) { setNewImage(URL.createObjectURL(e.target.files[0])); }}} style={{ marginTop: '10px' }} />
          <button onClick={() => setIsEditing(!isEditing)} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>{isEditing ? 'Done Editing' : 'Edit Notes'}</button>
          <button onClick={() => { setJsonData(prev => ({ ...prev, units: { ...prev.units, [modalContent.id]: { notes: modalContent.notes || '', imageUrl: modalContent.imageUrl || '' } } })); setIsModalOpen(false); }} style={{ marginTop: '10px', marginLeft: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save All</button>
          <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '10px', marginLeft: '10px', padding: '10px 20px', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Close</button>
        </div>
      )}

      {isImageOpen && (
        <div className="image-modal" style={{ position: 'fixed', top: '10%', left: '10%', width: '80%', height: '80%', backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <img src={newImage || modalContent?.imageUrl} alt="Enlarged" style={{ maxWidth: '90%', maxHeight: '90%' }} onClick={() => setIsImageOpen(false)} />
          <button onClick={() => setIsImageOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px', backgroundColor: '#fff', border: 'none', borderRadius: '50%', cursor: 'pointer' }}>X</button>
        </div>
      )}
    </div>
  );
};

export default MindMap;
