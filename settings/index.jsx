registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={<Text bold align="center">PW Digital Stats Settings</Text>}>
      <Text>
        PW Digital Stats is a minimal clock face, inspired by the Google Pixel style and Material Design You. Choose your color theme based on Material Design 3 palette.
      </Text>
      <Text> Check my other works on <Link source="https://www.instagram.com/made4fitbit/?hl=en">Made4Fitbit</Link> instagram page</Text>
    </Section>
    <Section
        title={<Text bold>Time</Text>}> 
      <Toggle
          settingsKey="standard_time"
          label="Force Standard Time (12h)"
      />
      <Select
            label="Color Theme"
            settingsKey="color_theme"
            options={[
              {
                name: "Just White",
                value: {
                  primaryLabel: "white", 
                  primaryContainer: "#394d00", 
                  secondaryLabel: "#fafdfd", 
                  secondaryContainer: "#434931", 
                  tertiaryLabel: "#4fd8eb", 
                  backgroundArc: "#2e3132",
                  surfaceVariant: "#46483c"
                }
              },
              {
                name: "Green",
                value: {
                  primaryLabel: "#baf395", 
                  primaryContainer: "#235105", 
                  secondaryLabel: "#ffffff", 
                  secondaryContainer: "#3e4a35", 
                  tertiaryLabel: "#bbebeb", 
                  backgroundArc: "#3f4c00", 
                  surfaceVariant: "#43483e"
                }
               },
              {
                name: "Light Blue",
                value: {
                  primaryLabel: "#9ccaff", 
                  primaryContainer: "#00497f", 
                  secondaryLabel: "#ffffff", 
                  secondaryContainer: "#3c4858", 
                  tertiaryLabel: "#f3daff", 
                  backgroundArc: "#2c3137", 
                  surfaceVariant: "#42474e" 
                }
              },
              {
                name: "Fitbit Style",
                value: {
                  primaryLabel: "#a9fedd", 
                  primaryContainer: "#4fba91", 
                  secondaryLabel: "#fbfbfb", 
                  secondaryContainer: "#3c4858", 
                  tertiaryLabel: "#e5c798", 
                  backgroundArc: "#111916", 
                  surfaceVariant: "#22332c"
                }
              },
              {
                name: "So Orange",
                value: {
                  primaryLabel: "#ffb85f", 
                  primaryContainer: "#663d00", 
                  secondaryLabel: "#dfc1a2", 
                  secondaryContainer: "#58432b", 
                  tertiaryLabel: "#bccd9e", 
                  backgroundArc: "#1f1b16", 
                  surfaceVariant: "#392f24"
                }
              },
              {
                name: "Acid Green",
                value: {
                  primaryLabel: "#b5d168", 
                  primaryContainer: "#394d00", 
                  secondaryLabel: "#c3caa9", 
                  secondaryContainer: "#434931", 
                  tertiaryLabel: "#a0d0c6", 
                  backgroundArc: "#1b1c17", 
                  surfaceVariant: "#2f3127"
                }
              },
              {
                name: "Ancient Pink",
                value: {
                  primaryLabel: "#ffdcc3", 
                  primaryContainer: "#802925", 
                  secondaryLabel: "#ffffff", 
                  secondaryContainer: "#5d3f3c", 
                  tertiaryLabel: "#fedfa6", 
                  backgroundArc: "#3b2d2c", 
                  surfaceVariant: "#534341" 
                }
              },
              {
                name: "Just Pink",
                value: {
                  primaryLabel: "#ffb1bc", 
                  primaryContainer: "#7c2939", 
                  secondaryLabel: "#e5bcc0", 
                  secondaryContainer: "#5c3f43", 
                  tertiaryLabel: "#e9bf8e", 
                  backgroundArc: "#211a1b", 
                  surfaceVariant: "#3a2d2e"
                }
              },
              {
                name: "Cream",
                value: {
                  primaryLabel: "#fff1ac", 
                  primaryContainer: "#534600", 
                  secondaryLabel: "#ffffff", 
                  secondaryContainer: "#4d472a", 
                  tertiaryLabel: "#c4eccf", 
                  backgroundArc: "#333024", 
                  surfaceVariant: "#313125" 
                }
              },
              {
                name: "Yellowasome",
                value: {
                  primaryLabel: "#fdff75", 
                  primaryContainer: "#484a00", 
                  secondaryLabel: "#c9c8a4", 
                  secondaryContainer: "#48482d", 
                  tertiaryLabel: "#a4d0bd", 
                  backgroundArc: "#1c1c16", 
                  surfaceVariant: "#313125"
                }
              }
            ]
            }
          />
    </Section>
  </Page>
));
