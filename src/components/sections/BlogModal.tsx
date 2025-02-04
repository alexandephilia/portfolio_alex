                    {section.heading && (
                      <motion.h3
                        variants={blogItemVariants}
                        className="text-xs md:text-sm font-semibold tracking-tight mt-4 sm:mt-6 mb-2 sm:mb-3"
                      >
                        {section.heading}
                      </motion.h3>
                    )}

                    {section.content.map((item, index) => (
                      <motion.div key={index} variants={blogItemVariants}>
                        {item.type === "paragraph" && (
                          <p className="text-[10px] md:text-xs leading-relaxed mb-3 sm:mb-4">
                            {addBlogInlineIcons(item.text || "")}
                          </p>
                        )}
                        {item.type === "image" && (
                          <motion.figure className="my-8 sm:my-12 max-w-[85%] mx-auto">
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden 
                              border border-border/50 
                              shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)]
                              dark:shadow-[0_2px_4px_-2px_rgba(0,0,0,0.2)]"
                            >
                              <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {item.caption && (
                              <figcaption className="mt-2 text-center text-[9px] md:text-[10px] text-muted-foreground italic">
                                {item.caption}
                              </figcaption>
                            )}
                          </motion.figure>
                        )}
                      </motion.div>
                    ))}

                    {section.quote && (
                      <motion.blockquote
                        variants={blogItemVariants}
                        className="border-l-3 border-primary/30 dark:border-primary/20 
                          bg-primary/[0.03] dark:bg-primary/[0.02]
                          pt-4 pb-8 px-6 sm:px-8 
                          my-12 sm:my-16 
                          text-[10px] md:text-xs 
                          relative mx-8 sm:mx-12 
                          rounded-lg
                          shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)]
                          dark:shadow-[0_2px_4px_-2px_rgba(0,0,0,0.2)]
                          overflow-visible"
                      > 