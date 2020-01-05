# Extract links from Telegram conversation exports

Use Telegram Desktop (the Qt one, not the native macOS one) to export a chat conversation, then:

```
# Export a list of all links from a conversation
./index.js path/to/ChatExport_XX_XX_XXXX > links.csv

# Then maybe export filter out only music links
cat links.csv | grep -E 'youtu\.?be|soundcloud|itunes' > music_links.csv

# Populate the list with the page title of each URL (might take a while)
cat music_links.csv | ./fetchTitles.js | tee music_links_titles.csv
```