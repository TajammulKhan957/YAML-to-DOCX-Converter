import sys
import yaml
from docx import Document
import os

# Load YAML data from file passed as argument
yaml_file = sys.argv[1]
with open(yaml_file, 'r') as file:
    yaml_data = yaml.safe_load(file)

# Create a new Document
document = Document()
document.add_heading('YAML to DOCX', 0)

def add_dict_to_docx(data, parent):
    if isinstance(data, dict):
        for key, value in data.items():
            if not isinstance(key, str):
                key = str(key)
            if isinstance(value, dict):
                parent.add_heading(key, level=1)
                add_dict_to_docx(value, parent)
            elif isinstance(value, list):
                parent.add_heading(key, level=2)
                for item in value:
                    if isinstance(item, dict):
                        add_dict_to_docx(item, parent)
                    else:
                        parent.add_paragraph(f'- {str(item)}')
            else:
                if not isinstance(value, str):
                    value = str(value)
                parent.add_paragraph(f'{key}: {value}')
    elif isinstance(data, list):
        for item in data:
            add_dict_to_docx(item, parent)
    else:
        if not isinstance(data, str):
            data = str(data)
        parent.add_paragraph(data)

# Add YAML data to document
add_dict_to_docx(yaml_data, document)

# Save the document in the same directory as the YAML file
output_path = os.path.splitext(yaml_file)[0] + '.docx'
document.save(output_path)
