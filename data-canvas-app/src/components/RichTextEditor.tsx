// File: src/components/RichTextEditor.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Select, 
  Text, 
  VStack,
  HStack
} from '@chakra-ui/react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateContent } from '../store/editorSlice';

interface RichTextEditorProps {
  userId: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const storedContent = useSelector((state: RootState) => 
    state.editor.content[userId] || null
  );
  
  const [editorState, setEditorState] = useState(() => {
    if (storedContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(storedContent));
        return EditorState.createWithContent(contentState);
      } catch (e) {
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });
  
  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    
    const content = JSON.stringify(
      convertToRaw(state.getCurrentContent())
    );
    
    dispatch(updateContent({ userId, content }));
  };
  
  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };
  
  const onBoldClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  
  const onItalicClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };
  
  const onUnderlineClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };
  
  const onBlockChange = (blockType: string) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };
  
  return (
    <Box border="1px" borderColor="gray.200" borderRadius="md" p={4}>
      <VStack spacing={4} align="stretch">
        <HStack spacing={2}>
          <Button onMouseDown={(e) => {
            e.preventDefault();
            onBoldClick();
          }} size="sm">
            Bold
          </Button>
          <Button onMouseDown={(e) => {
            e.preventDefault();
            onItalicClick();
          }} size="sm">
            Italic
          </Button>
          <Button onMouseDown={(e) => {
            e.preventDefault();
            onUnderlineClick();
          }} size="sm">
            Underline
          </Button>
          
          <Select 
            size="sm"
            width="150px"
            onChange={(e) => onBlockChange(e.target.value)}
            value={editorState
              .getCurrentContent()
              .getBlockForKey(editorState.getSelection().getStartKey())
              .getType()}
          >
            <option value="unstyled">Normal</option>
            <option value="header-one">Heading 1</option>
            <option value="header-two">Heading 2</option>
            <option value="header-three">Heading 3</option>
            <option value="unordered-list-item">Bullet List</option>
            <option value="ordered-list-item">Numbered List</option>
          </Select>
        </HStack>
        
        <Box 
          border="1px" 
          borderColor="gray.200" 
          borderRadius="md" 
          p={2} 
          minH="200px"
          bg="white"
        >
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default RichTextEditor;