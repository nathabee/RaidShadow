#!/bin/bash

# Counter for generating IDs
id=0

# Loop through all files matching the pattern raid*.jpeg
for file in raid*.jpeg; do
    # Generate formatted ID with leading zeros
    id_formatted=$(printf "%04d" $id)

    # Generate new filename
    new_filename="champion_${id_formatted}.jpeg"

    # Rename the file
    mv "$file" "$new_filename"

    # Increment ID
    id=$((id + 1))
done
