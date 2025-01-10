import React from 'react';
import { Form, ListGroup, Spinner } from 'react-bootstrap';

interface SearchBarProps<T> {
  query: string;
  onQueryChange: (query: string) => void;
  items: T[];
  onSelectItem: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  noResultMessage?: string;
  isLoading?: boolean;
}

const SearchBar = <T extends unknown>({
  query,
  onQueryChange,
  items,
  onSelectItem,
  renderItem,
  noResultMessage = 'No results found.',
  isLoading = false,
}: SearchBarProps<T>) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="custom-input mb-0"
      />

      {query && (
        <ListGroup className="mt-3">
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => onSelectItem(item)}
                style={{ cursor: 'pointer' }}
              >
                {renderItem(item)}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>{noResultMessage}</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
