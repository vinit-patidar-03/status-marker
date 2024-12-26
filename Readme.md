# ERP Status Marker

ERP Status Marker is a Chrome extension that enhances the IIT KGP ERP platform by visually highlighting the status of company openings as **Active** , **Urgent** , or **Closed** . Users can customize the color codes for each status, simplifying the process of tracking opportunities.

## Features

- Highlights statuses of company openings dynamically.
- Customizable color codes for statuses via the popup menu.
- Real-time updates using Chrome Storage API.
- Easy reset to default theme.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the folder containing the extension.

## How to Use

1. Open the IIT KGP ERP page.
2. Click on the extension icon in the Chrome toolbar.
3. Set your preferred colors for **Active** , **Urgent** , and **Closed** statuses.
4. Click **Submit** to apply the changes.
5. Use the **Reset Theme** button to restore default colors.

## Default Colors

- **Active** : Green (#008000)
- **Urgent** : Orange (#F14A00)
- **Closed** : Red (#A0153E)

## Development

This extension uses the following technologies:

- **Manifest v3** for Chrome extensions
- **Content Scripts** for dynamically interacting with the ERP platform
- **Chrome Storage API** for persisting user preferences
- **JavaScript, HTML, CSS** for frontend functionality

## File Structure

```
project-folder/
|-- src/
|   |-- popup.html
|   |-- scripts/
|   |   |-- pop-scripts/popup.js
|   |   |-- content-scripts/content.js
|   |   |-- event-scripts/background.js
|   |-- styles/
|       |-- popup.css
|-- icons/
|   |-- icon16.png
|   |-- icon32.png
|   |-- icon48.png
|   |-- icon128.png
|-- manifest.json
```

## Video Demonstration
For demonstration purposes and testing, the date `17-10-2024 17:00` has been used to validate the extension's functionality.
[Video Link](https://github.com/user-attachments/assets/251fd2bb-5a6a-449b-972e-a1e69fa7c9c2)

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/vinit-patidar-03/status-marker/blob/master/LICENSE) file for details.

## Contact

For any inquiries, feel free to reach out:

- **Author** : Vinit Patidar
- **Email** : [vinitpatidar780@gmail.com](mailto:vinitpatidar780@gmail.com)
