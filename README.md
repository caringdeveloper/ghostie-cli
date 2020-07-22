# Ghostie CLI

> A small CLI tool to handle Cyberghost VPN on Linux.

## Installing

```bash
npm i -g ghostie-cli
```

## Using the CLI

> IMPORTANT: You need to install the cyberghostvpn CLI beforehand and you need an active Cyberghost subscription. Refer to their documentation here: https://support.cyberghostvpn.com/hc/en-us/articles/360020436274-How-to-install-the-CyberGhostVPN-CLI-App-on-Linux-

### List Mode

```bash
# List cities for a country
ghostie-cli -l -c US

# List servers for a city in a country
ghostie-cli -l -c US -i Washington
```

### Connect Mode

```bash
# Connect to a country
ghostie-cli -g -c US

# Connect to a city in a country
ghostie-cli -g -c US -i Washington

# Connect to a server in a city in a country
ghostie-cli -g -c US -i Washington -s washington-s409-i11
```

### Favorites Mode

```bash
# List your favorites
ghostie-cli -f

# Save a favorite (Example)
# You can attach -x after any connect command to save it as favorite
ghostie-cli -g -c US -i Washington -x

# Connect to a favorite (Example you need to use the index of your favorite)
ghostie-cli -g -f 0
```

## Contributing

PRs are appreciated because there is always room to improve and things to learn :blush:

## Authors

- **Erek Röös** - _Initial work_ - [Caringdeveloper](https://github.com/caringdeveloper)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
