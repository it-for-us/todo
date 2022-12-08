package com.it4us.todoapp.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Workspaces")
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "workspace_id")
    private Long id;

    @Column(name = "workspace_name")
    private String name;

   /* @ManyToOne
    private User user;

    @OneToMany
    private List<Board> boards;*/
}
